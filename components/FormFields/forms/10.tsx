//Quality Check:  Ceramics
import InputMultipleStrings from "../../InputMultipleStrings";

const FormExtra: React.FunctionComponent = () => {

    return (
      <div>
        <label htmlFor="description">Description</label>
        <textarea required placeholder="Tell Us More..." rows={3} id="description" />

        <label htmlFor="SKUs">SKU(s)</label>
        <InputMultipleStrings inputId='SKUs' buttonName='Add SKU' placeholderText='Type an SKU and click "Add SKU"'/>

        <label htmlFor="totalUnits">Total Units</label>
        <input required type="number" min={1} id='totalUnits' />

    </div>
    )
}

export default FormExtra;