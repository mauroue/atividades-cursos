import Header from './components/Header'
import Card from './components/Card'
import data from './data';

function App() {

  const cards = data.map(item => {
    console.log(item);
    return (
        <Card
            key={item.id}
            item={item}
        />
    )
  })        

  return (


    <div className="App">
      <Header />
      {cards}
    </div>
  );
}

export default App;
