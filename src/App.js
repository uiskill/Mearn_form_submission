

import 'bootstrap/dist/css/bootstrap.min.css';
//import TagInput from './TagInput';
import Registration from './Registration';
import View from './View';

function App() {
  return (
    <div className="App">
          <div className="row"> 
            <div className="col-sm-4">   <Registration/></div>
            <div className="col-sm-8">   <View/></div>
          </div>

  
    </div>
  );
}

export default App;
