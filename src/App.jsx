import FormModule from "./02-Components/01-Form/FormModule";
import SimulatorResponseModule from "./02-Components/02-simulatorResponse/simulatorResponseModule";
const App = () => {
  return (
    <>
      <FormModule />
      <section>
        <div className="container">
          <SimulatorResponseModule />
        </div>
      </section>
    </>
  );
}
export default App;