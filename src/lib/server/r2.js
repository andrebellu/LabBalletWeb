import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

export async function listR2Objects({ page = 1, limit = 20 }) {
    if (!process.env.R2_BUCKET_NAME) {
        throw new Error("R2_BUCKET_NAME is not defined");
    }

    const client = new S3Client({
        region: 'auto',
        endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
        }
    });

    let allKeys = [];
    let continuationToken = undefined;

    do {
        const response = await client.send(
            new ListObjectsV2Command({
                Bucket: process.env.R2_BUCKET_NAME,
                ContinuationToken: continuationToken,
            })
        );

        if (response.Contents) {
            allKeys = [...allKeys, ...response.Contents];
        }

        continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    const totalCount = allKeys.length;

    allKeys.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = allKeys.slice(start, end);

    return {
        objects: paginated,
        totalCount
    };
}
