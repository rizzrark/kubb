import { mockedPluginManager } from '@kubb/core/mocks'
import { createRootServer } from '@kubb/react/server'
import { OasManager } from '@kubb/swagger'

import { OperationGenerator } from '../OperationGenerator.tsx'
import { Mock } from './Mock.tsx'

import type { KubbPlugin } from '@kubb/core'
import type { AppContextProps } from '@kubb/react'
import type { GetOperationGeneratorOptions } from '@kubb/swagger'
import type { PluginOptions } from '../types.ts'

describe('<Mock/>', async () => {
  const oas = await OasManager.parseFromConfig({
    root: './',
    output: { path: 'test', clean: true },
    input: { path: 'packages/swagger-msw/mocks/petStore.yaml' },
  })

  const options: GetOperationGeneratorOptions<OperationGenerator> = {
    templates: {
      mock: Mock.templates,
    },
  }

  const plugin = { options } as KubbPlugin<PluginOptions>
  const og = await new OperationGenerator(
    options,
    {
      oas,
      exclude: [],
      include: undefined,
      pluginManager: mockedPluginManager,
      plugin,
      contentType: undefined,
      override: undefined,
    },
  )

  test('showPetById', async () => {
    const operation = oas.operation('/pets/{petId}', 'get')
    const schemas = og.getSchemas(operation)
    const context: AppContextProps<PluginOptions['appMeta']> = { meta: { oas, pluginManager: mockedPluginManager, plugin, schemas, operation } }

    const Component = () => {
      return <Mock.File />
    }
    const root = createRootServer({ logger: mockedPluginManager.logger })
    const output = await root.renderToString(<Component />, context)

    expect(output).toMatchSnapshot()
  })

  test('pets', async () => {
    const operation = oas.operation('/pets', 'post')
    const schemas = og.getSchemas(operation)
    const context: AppContextProps<PluginOptions['appMeta']> = { meta: { oas, pluginManager: mockedPluginManager, plugin, schemas, operation } }

    const Component = () => {
      return <Mock.File />
    }
    const root = createRootServer({ logger: mockedPluginManager.logger })
    const output = await root.renderToString(<Component />, context)

    expect(output).toMatchSnapshot()
  })
})