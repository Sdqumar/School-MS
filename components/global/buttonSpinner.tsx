import Spinner from "../utils/Spinner";

export default function ButtonSpinner({ loading }) {
    return <button className="flex" disabled={loading } >
        <Spinner loading={loading} /> Submit
    </button>

}
