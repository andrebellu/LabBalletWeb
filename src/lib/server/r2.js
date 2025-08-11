import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, CF_ACCOUNT_ID } from '$env/static/private';

export async function listR2Objects({ page = 1, limit = 20 }) {
    if (!R2_BUCKET_NAME) {
        throw new Error("R2_BUCKET_NAME is not defined");
    }

    const client = new S3Client({
        region: 'auto',
        endpoint: `https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: R2_ACCESS_KEY_ID,
            secretAccessKey: R2_SECRET_ACCESS_KEY
        }
    });

    let allKeys = [];
    let continuationToken = undefined;

    do {
        const response = await client.send(
            new ListObjectsV2Command({
                Bucket: R2_BUCKET_NAME,
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
