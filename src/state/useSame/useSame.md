---
title: useSame
group:
  path: /state
  order: 3
---

# useSame

用于对同组件的不同实例进行管理，获取其他已渲染组件的共享数据以及当前处在启用实例中的顺序

常见用例有

- 获取 Modal 等组件的实例关系，根据组件渲染顺序设置 zIndex，隐藏多余的 mask 等
- 对于 Drawer 等组件，根据渲染顺序调整显示的层级
- 其他需要共享实例状态的组件

## 示例

<code src="./useSame.demo.tsx" />

## API

```ts
/**
 * @param key - 标识该组件的唯一key
 * @param config - 额外配置
 * @param config.meta - 用于共享的组件源数据，可以在同组件的其他实例中获取到
 * @param config.deps - [] | 出于性能考虑，各组件共享的meta只在该实例index变更时更新，以通过此项传入依赖项数组在任意一个依赖变更后更新meta
 * @param config.enable - true | 只有在dep的值为true时，该实例才算启用并被钩子接受, 通常为Modal等组件的toggle参数
 * @return state - 同类型启用组件共享的状态
 * @return state[0] index - 该组件实例处于所有实例中的第几位，未启用的组件返回-1
 * @return state[1] instances - 所有启用状态的组件<Item>组成的数组，正序
 * @return state[2] id - 该组件实例的唯一标识
 * */
export function useSame<Meta = any>(
  key: string,
  config?: {
    meta?: Meta;
    deps?: any[];
    enable?: boolean;
  },
): state;
```
