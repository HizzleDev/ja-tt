import { Spinner } from './components/spinner'

const LoadingView = () => (
    <div className="flex justify-center items-center">
        <Spinner size={7} />
    </div>
)

export default LoadingView
