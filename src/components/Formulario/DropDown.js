function DropDown({children, selectedOptions, combo, comboList}) {
  return (
    <>
      <ul
        className="selected-options"
        id="combo3-selected"
        ref={selectedOptions}
      />
      <div className="combo js-multiselect" ref={combo}>
        {children}
        <div
          ref={comboList}
          className="combo-menu"
          role="listbox"
          id="listbox3"
          name=""
        />
      </div>
    </>
  )
}
export default DropDown
