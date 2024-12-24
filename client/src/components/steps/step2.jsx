import "./step.css"

export default function Step1() {
    return (
        <div class="progress-container">

            <div class="progress-step completed">
                <img src="/completeSymbol.svg" class="circle" alt="Step 1 Completed" />
                <div class="label">email</div>
            </div>

            <div class="lineContent">
                <img src="/line.svg" class="line" alt="Line Completed" />
            </div>

            <div class="progress-step completed">
                <img src="/completeSymbol.svg" class="circle" alt="Step 2 Completed" />
                <div class="label">video upload</div>
            </div>

            <div class="lineContent">
                <img src="/line.svg" class="line" alt="Line Completed" />
            </div>


            <div class="progress-step">
                <img src="/third.svg" class="circle" alt="Step 3 Pending" />
                <div class="label">complete</div>
            </div>
        </div>

    );
}