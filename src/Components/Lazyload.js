import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Loading from './Loading';


const Lazyload = () => {
  const [data, setData] = useState([]);

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(10);
  const [totalIds, setTotalIds] = useState(10);

  const [spin, setSpin] = useState(false)


  const fetchData = (start, end) => {
    console.log(start, "start")
    console.log(end, "end")
    return axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_end=${end}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching data:', error);
        return [];
      });
  };

  const fetchDataAndUpdate = () => {
    
    setSpin(true)

    if (start <= totalIds) {
      fetchData(start, end).then(newData => {
        const newDataWithIds = newData.map((item, index) => ({
          ...item,
          id: end + index,
        }));

        setData(prevData => [...prevData, ...newDataWithIds]);
        setStart(prevStart => prevStart + 10);
        setEnd(prevEnd => prevEnd + 10);
      }).catch(error => {
        console.error('Error fetching and updating data:', error);
      });
    } else {
      console.log('All data loaded.');
    }
  };

  useEffect(() => {
    fetchDataAndUpdate();
  }, []);

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!isInitialRender.current) {
      fetchDataAndUpdate();
    } else {
      isInitialRender.current = false;
    }
  }, [start, end]);


  const observerTarget = useRef(null);


  useEffect(() => {


    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {

          fetchDataAndUpdate();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {

        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return (
    // <div style={{ height: '900px', overflow: 'auto' }}>


    <div>

      <ol>
        {data.map(item => (
          // <li key={item.userId}>
           
          // </li>
      
          <img src={item.thumbnailUrl} height={300} width={300} />
        ))}

      </ol>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {
          spin ?

            <Loading   />
            :null
        }
      </div>
      <div ref={observerTarget}></div>

    </div>
  );
};

export default Lazyload;
