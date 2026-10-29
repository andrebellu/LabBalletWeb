import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, CF_ACCOUNT_ID } from '$env/static/private';

import pkg from '@xmldom/xmldom';
const { DOMParser } = pkg;

if (typeof globalThis.DOMParser === 'undefined') {
    globalThis.DOMParser = DOMParser;
}

if (typeof globalThis.Node === 'undefined') {
    globalThis.Node = {
        ELEMENT_NODE: 1, ATTRIBUTE_NODE: 2, TEXT_NODE: 3, CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5, ENTITY_NODE: 6, PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8, DOCUMENT_NODE: 9, DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11, NOTATION_NODE: 12
    };
}

let client;

function getClient() {
    if (!client) {
        client = new S3Client({
            region: 'auto',
            endpoint: `https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: R2_ACCESS_KEY_ID,
                secretAccessKey: R2_SECRET_ACCESS_KEY
            }
        });
    }
    return client;
}

const listCache = new Map();
const LIST_TTL_MS = 10 * 60 * 1000;

async function listAllKeys(prefix) {
    const cacheKey = prefix ?? '';
    const cached = listCache.get(cacheKey);
    if (cached && Date.now() - cached.time < LIST_TTL_MS) {
        return cached.keys;
    }

    let keys = [];
    let continuationToken;

    do {
        const response = await getClient().send(
            new ListObjectsV2Command({
                Bucket: R2_BUCKET_NAME,
                ContinuationToken: continuationToken,
                ...(prefix ? { Prefix: prefix } : {})
            })
        );
        if (response.Contents) keys.push(...response.Contents);
        continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    keys.sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified));
    listCache.set(cacheKey, { keys, time: Date.now() });
    return keys;
}

export async function listR2Objects({ page = 1, limit = 20, prefix }) {
    if (!R2_BUCKET_NAME) {
        throw new Error('R2_BUCKET_NAME is not defined');
    }

    const keys = await listAllKeys(prefix);
    const start = (page - 1) * limit;

    return {
        objects: keys.slice(start, start + limit),
        totalCount: keys.length
    };
}
