const filterArray = (array) => {
  const unique = array.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  return unique;
};

const formatData = (array) => {
  return array.map((el) => {
    return {
      id: el.artist.id,
      name: el.artist.name,
      picture_medium: el.artist.picture_medium,
      type: el.type,
    };
  });
};

module.exports = {
  filterArray,
  formatData,

};
