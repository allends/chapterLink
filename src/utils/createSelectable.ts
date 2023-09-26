import { createEffect, createMemo, createSignal } from "solid-js"

export const createSelectableList = <T>(items: T[], extractor: (item: T) => string, multiple = true ) => {
  const [internalItems, setItems] = createSignal<T[]>(items)
  const [selectedIds, setSelectedIds] = createSignal<string[]>([])
  const selectedItems = createMemo(() => internalItems().filter(item => selectedIds().includes(extractor(item))))

  const isItemSelected = (item: T) => {
    return selectedIds().includes(extractor(item))
  }

  const addItem = (item: T) => {
    if (!multiple) {
      setSelectedIds([extractor(item)])
      return
    }
    setSelectedIds([...selectedIds(), extractor(item)])
  }

  const removeItem = (item: T) => {
    setSelectedIds(selectedIds().filter(id => id !== extractor(item)))
  }

  const toggleItem = (item: T) => {
    if (isItemSelected(item)) {
      removeItem(item)
    } else {
      addItem(item)
    }
  }

  return {
    addItem,
    isItemSelected,
    removeItem,
    selectedIds,
    selectedItems,
    setItems,
    setSelectedIds,
    toggleItem
  }
}