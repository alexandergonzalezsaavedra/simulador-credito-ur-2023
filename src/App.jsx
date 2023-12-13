import FormModule from "./02-Components/01-Form/FormModule";
import SimulatorResponseModule from "./02-Components/02-simulatorResponse/simulatorResponseModule";


const App = () => {
  return (
    <>
      <section>
        <div className="container bg-dark py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-6">
              <FormModule />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <SimulatorResponseModule />
        </div>
      </section>
    </>
  );
}
export default App;