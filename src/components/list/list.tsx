import { useEffect } from 'react';
import { useSkins } from '../../hooks/skins/use.skins';
import { Card } from '../card/card';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import './list.scss';

export default function List() {
  const { loadSkins, skins } = useSkins();

  useEffect(() => {
    loadSkins();
  }, [loadSkins]);

  return (
    <>
      <Header></Header>
      <ul className="skins-list">
        {skins.map((item) => (
          <Card key={item.name} skin={item}></Card>
        ))}
      </ul>
      <Footer></Footer>
    </>
  );
}
