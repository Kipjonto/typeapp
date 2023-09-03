const modifications = [
  {
    name: "Blindness", 
    function: () => {}
  },
  {
    name: "Punctuation",
    function: () => {}
  },
  {
    name: "Numbers",
    function: () => {}
  },
  {
    name: "Daltonism", 
    function: () => {}
  },
  {
    name: "Capital",
    function: () => {}
  },
  {
    name: "Smooth",
    function: () => {}
  }
];

const Modifications = () => {
  const modificationList = modifications.map(mode => {
    return (
      <button 
        className='button--modification'
        onClick={() => mode.function}
      >
        {mode.name}
      </button>
    );
  })

  return (
    <div className='section section--modifications'>
      <p>Modifications</p>
      <div className='section__scroll scroll--modifications'>
        {modificationList}
      </div>
    </div>
  );
}

export default Modifications;

