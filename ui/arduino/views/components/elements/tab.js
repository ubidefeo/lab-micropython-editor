function Tab(args) {
  const {
    text = 'undefined',
    icon = 'computer.svg',
    onSelectTab = () => false,
    onCloseTab = () => false,
    onStartRenaming = () => false,
    onFinishRenaming = () => false,
    disabled = false,
    active = false,
    renaming = false,
    hasChanges = false
  } = args

  if (active) {
    if (renaming) {
      function onBlur(e) {
        onFinishRenaming(e.target.value)
      }
      function onKeyDown(e) {
        if(e.key.toLowerCase() === 'enter') {
          e.target.blur()
        }
        if(e.key.toLowerCase() === 'escape') {
          e.target.value = null
          e.target.blur()
        }
      }
      return html`
        <div class="tab active" tabindex="0">
          <img class="icon" src="media/${icon}" />
          <div class="text">
            <input type="text"
              value=${text}
              onblur=${onBlur}
              onkeydown=${onKeyDown}
              />
          </div>
        </div>
      `
    } else {
      return html`
        <div class="tab active" tabindex="0">
          <img class="icon" src="media/${icon}" />
          <div class="text" ondblclick=${onStartRenaming}>
            ${hasChanges ? ' *' : ''} ${text}
          </div>
          <div class="options" >
            <button onclick=${onCloseTab}>
              <img class="icon" src="media/close.svg" />
            </button>
          </div>
        </div>
      `
    }

  }

  function selectTab(e) {
    if(e.target.classList.contains('close-tab')) return
    onSelectTab(e)
  }

  return html`
    <div
      class="tab"
      tabindex="1"
      onclick=${selectTab}
      >
      <img class="icon" src="media/${icon}" />
      <div class="text">
        ${hasChanges ? '*' : ''} ${text}
      </div>
      <div class="options close-tab">
        <button class="close-tab" onclick=${onCloseTab}>
          <img class="close-tab icon" src="media/close.svg" />
        </button>
      </div>
    </div>
  `
}
