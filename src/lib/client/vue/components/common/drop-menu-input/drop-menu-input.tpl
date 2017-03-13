<div class="drop-menu-input-stage {{ theme | themeClass }}">
  <drop-menu
			:value="dropMenuVal"
			:option-items="dropMenuItems"
			:query-name="menuQueryName">
		<slot></slot>
	</drop-menu>
	<input-box
			:error-message="inputErrorMessage"
			:empty="inputEmpty"
			:read-only="inputReadOnly"
			:value="inputVal"
			:placeholder="placeholder"
			:query-name="inputQueryName">
		<slot name="inputSlot"></slot>
	</input-box>
</div>