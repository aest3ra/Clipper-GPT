import "./step.css"

export default function Step1() {
    return (
        <div className="progress-container">

            <div className="progress-step completed">
                <img src="/completeSymbol.svg" className="circle" alt="Step 1 Completed" />
                <div className="label">email</div>
            </div>

            <div className="lineContent">
                <img src="/line.svg" className="line" alt="Line Completed" />
            </div>

            <div className="progress-step completed">
                <img src="/completeSymbol.svg" className="circle" alt="Step 2 Completed" />
                <div className="label">video upload</div>
            </div>

            <div className="lineContent">
                <img src="/line.svg" className="line" alt="Line Completed" />
            </div>


            <div className="progress-step completed">
                <img src="/completeSymbol.svg" className="circle" alt="Step 3 Completed" />
                <div className="label">complete</div>
            </div>
        </div>

    );
}