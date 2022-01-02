import Spinner from "../utils/Spinner";

export default function ButtonSpinner({ loading }) {
    return <button className="flex">
        <Spinner loading={loading} /> Submit
    </button>

}
