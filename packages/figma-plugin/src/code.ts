/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, { width: 360, height: 520, themeColors: false })

interface NodeData {
  name: string
  type: string
  width: number
  height: number
  childCount: number
  textContent: string
}

function extractNodeData(node: SceneNode): NodeData {
  let textContent = ""

  if ("children" in node) {
    const texts = (node as ChildrenMixin).children
      .filter((c): c is TextNode => c.type === "TEXT")
      .map((c) => c.characters)
      .join(" ")
    textContent = texts.slice(0, 200)
  } else if (node.type === "TEXT") {
    textContent = (node as TextNode).characters.slice(0, 200)
  }

  return {
    name: node.name,
    type: node.type,
    width: "width" in node ? Math.round((node as LayoutMixin).width) : 0,
    height: "height" in node ? Math.round((node as LayoutMixin).height) : 0,
    childCount: "children" in node ? (node as ChildrenMixin).children.length : 0,
    textContent,
  }
}

function sendSelection() {
  const selection = figma.currentPage.selection
  figma.ui.postMessage({
    type: "selection",
    nodes: selection.map(extractNodeData),
  })
}

// Send initial selection on open
sendSelection()

// Update whenever selection changes
figma.on("selectionchange", sendSelection)

figma.ui.onmessage = (msg: { type: string }) => {
  if (msg.type === "close") figma.closePlugin()
}
