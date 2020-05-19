export function getTopbar(tableName) {
  return `
    <input type="text" class="input" value="${tableName}" />
    <div class="topbar__buttons">
      <button class="button">
        <span class="material-icons">delete</span>
      </button>
      <button class="button">
        <span class="material-icons">exit_to_app</span>
      </button>
    </div>
  `
}
