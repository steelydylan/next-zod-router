import { expect, test, describe } from 'vitest'
import httpMocks from 'node-mocks-http'
import cors from 'cors'
import { z } from 'zod'
import { createRouter, validate, createError } from '../src'

describe('router', () => {
  test('get', async () => {
    const router = createRouter()
    const handler = router
      .get((req, res) => {
        res.status(200).json({ message: 'ok' })
      })
      .run()
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/sample',
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'ok' })
  })
  test('post', async () => {
    const router = createRouter()
    const handler = router
      .post((req, res) => {
        res.status(200).json({ message: 'ok' })
      })
      .run()
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/sample',
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'ok' })
  })
  test('put', async () => {
    const router = createRouter()
    const handler = router
      .put((req, res) => {
        res.status(200).json({ message: 'ok' })
      })
      .run()
    const req = httpMocks.createRequest({
      method: 'PUT',
      url: '/api/sample',
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'ok' })
  })
  test('delete', async () => {
    const router = createRouter()
    const handler = router
      .delete((req, res) => {
        res.status(200).json({ message: 'ok' })
      })
      .run()
    const req = httpMocks.createRequest({
      method: 'DELETE',
      url: '/api/sample',
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'ok' })
  })
  test('patch', async () => {
    const router = createRouter()
    const handler = router
      .patch((req, res) => {
        res.status(200).json({ message: 'ok' })
      })
      .run()
    const req = httpMocks.createRequest({
      method: 'PATCH',
      url: '/api/sample',
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'ok' })
  })
});

describe('validation', () => {
  test('validate query', async () => {
    const router = createRouter()
    const handler = router
      .get(
        validate({
          query: z.object({
            name: z.string(),
          }),
        }),
        (req, res) => {
          res.status(200).json({ message: 'ok' })
        },
      )
      .run()
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/sample',
      query: {
        name: 'foo',
      },
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'ok' })
  })
  test('validate query error', async () => {
    const router = createRouter()
    const handler = router
      .get(
        validate({
          query: z.object({
            name: z.string(),
          }),
        }),
        (req, res) => {
          res.status(200).json({ message: 'ok' })
        },
      )
      .run()
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/sample',
      query: {},
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    expect(res._getStatusCode()).toBe(400)
  })
  test('validate body', async () => {
    const router = createRouter()
    const handler = router
      .post(
        validate({
          body: z.object({
            name: z.string(),
          }),
        }),
        (req, res) => {
          res.status(200).json({ message: 'ok' })
        },
      )
      .run()
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/sample',
      body: {
        name: 'foo',
      },
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'ok' })
  })
  test('validate body error', async () => {
    const router = createRouter()
    const handler = router
      .post(
        validate({
          body: z.object({
            name: z.string(),
          }),
        }),
        (req, res) => {
          res.status(200).json({ message: 'ok' })
        },
      )
      .run()
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/sample',
      body: {},
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    expect(res._getStatusCode()).toBe(400)
  })
})

describe('middleware', () => {
  test('cors', async () => {
    const router = createRouter()
    const handler = router
      .use(cors())
      .get((req, res) => {
        res.status(200).json({ message: 'ok' })
      })
      .run()
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/sample',
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'ok' })
    expect(res._getHeaders()).toMatchObject({
      'access-control-allow-origin': '*',
    })
  })

  test('async middleware test', async () => {
    const router = createRouter()
    const arr: string[] = []
    const handler = router
      .use(async (req, res, next) => {
        arr.push('start')
        if (next) {
          await next()
        }
        arr.push('end')
      })
      .get((req, res) => {
        arr.push('get')
        res.status(200).json({ message: 'ok' })
      })
      .run()
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/sample',
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    arr.push('handler')
    expect(res._getStatusCode()).toBe(200)
    expect(arr).toEqual(['start', 'get', 'end', 'handler'])
  })

  test('sync middleware test', async () => {
    const router = createRouter()
    const arr: string[] = []
    const handler = router
      .use((req, res, next) => {
        arr.push('use')
        if (next) {
          next()
        }
      })
      .get((req, res) => {
        arr.push('get')
        res.status(200).json({ message: 'ok' })
      })
      .run()
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/sample',
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    arr.push('end')

    expect(res._getStatusCode()).toBe(200)
    expect(arr).toEqual(['use', 'get', 'end'])
  })
})



describe('error', () => {
  test('error', async () => {
    const router = createRouter()
    const handler = router
      .get(() => {
        throw new Error('error')
      })
      .run()
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/sample',
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    expect(res._getStatusCode()).toBe(500)
  })
  test('error with status', async () => {
    const router = createRouter()
    const handler = router
      .get(() => {
        throw createError(400, 'error')
      })
      .run()
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/sample',
    })
    const res = httpMocks.createResponse()
    await handler(req, res)
    expect(res._getStatusCode()).toBe(400)
    expect(res._getJSONData()).toEqual({ message: 'error' })
  })
})
