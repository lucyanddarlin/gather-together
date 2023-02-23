import presetWeapp from 'unocss-preset-weapp'
import {
  transformerAttributify,
  transformerClass,
} from 'unocss-preset-weapp/transformer'

export default {
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
  ],
  shortcuts: [
    {
      'border-base': 'border border-gray-500_10',
      'flex-center': 'flex justify-center items-center',
    },
  ],

  theme: {
    colors: {
      main: '#4380FF',
      follow: '#FF6969',
      favour: '#56C28E',
      setting: '#FFAF50',
      page: 'var(--page-color)',
      test: 'var(--test)',
    },
  },
  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
}
