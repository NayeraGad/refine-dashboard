import { error } from 'console'
import type {GraphQLFormattedError} from 'graphql'

type Error = {
    message: string,
    statusCode: string
}

/*
    This function performs a fetch request to a given URL with customized headers.
 */
const customFetch = async (url: string, options: RequestInit) => {
    const accessToken = localStorage.getItem('accessToken')

    const headers = options.headers as Record<string, string>

    return await fetch(url, {
        ...options,
        headers: {
            ...headers,
            Authorization: headers?.Authorization || `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Apollo-Require-Preflight': 'true',
        }
    })
}

/* 
    This function checks the response body for GraphQL errors.
 */
const getGraphQLErrors = (body: Record<'errors', GraphQLFormattedError[] | undefined>,): Error | null => {
    if(!body) {
        return {
            message: 'Unknown error',
            statusCode: 'INTERNAL_SERVER_ERROR'
        }
    }

    if ('errors' in body) {
        const errors = body?.errors

        const messages = errors?.map((error) => error?.message)?.join('');
        const code = errors?.[0]?.extensions?.code;

        return {
            message: messages || JSON.stringify(errors),
            statusCode: code || 500
        }
    }

    return null
}

/* 
    This function acts as a wrapper around the customFetch function to handle
    GraphQL-specific error checking.
 */
export const fetchWrapper = async (url: string, options: RequestInit) => {
    const response = await customFetch(url, options);

    const responseClone = response.clone();

    const body = await responseClone.json()

    const error = getGraphQLErrors(body);

    if(error) {
        throw error;
    }

    return response;
}