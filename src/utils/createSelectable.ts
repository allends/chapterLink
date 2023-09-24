import { createMemo, createSignal } from "solid-js"

export const createSelectableList = <T>(items: T[], extractor: (item: T) => string, multiple = true ) => {
  const [selectedIds, setSelectedIds] = createSignal<string[]>([])
  const selectedItems = createMemo(() => {
    return items.filter(item => selectedIds().includes(extractor(item))
  )})

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
    selectedItems,
    setSelectedIds,
    isItemSelected,
    addItem,
    removeItem,
    toggleItem
  }
}