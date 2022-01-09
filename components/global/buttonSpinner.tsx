import Spinner from "../utils/Spinner";

export default function ButtonSpinner({ loading, label = 'submit', ...rest }) {
    return <button className="flex" disabled={loading} {...rest}>
        <Spinner loading={loading} /> {!loading && label}
    </button>

}
