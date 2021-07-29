import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from  '@material/react-material-icon';
import { Card, GreenPlaceCard ,Map, Modal, Loader} from '../../components';

import logo from '../../assets/logogreen.png';
import floresta from '../../assets/treee.png';

import { Container,
         Search,
         Logo,
         Wrapper,
         CarouselTitle,
         Carousel,
         ModalTitle,
         ModalContent} from './styled';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [query, setQuery] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const { parks, parkSelected } = useSelector((state) => state.parks);

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
  };

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      setQuery(inputValue);
    }
  }

  function handleOpenModal(placeId){
    setPlaceId(placeId);
    setModalOpened(true);
  }

return (
    <Wrapper>
    <Container>
        <Search>
            <Logo src={logo} alt="Logo do app" />
            <TextField 
            label="Pesquisar"
            outlined 
            trailingIcon={<MaterialIcon role="button" icon="search" />}>
            <Input value={inputValue} onKeyPress={handleKeyPress} onChange={(e) => setInputValue(e.target.value)} />   
            </TextField>
            {parks.length > 0 ?(
              <>
              <CarouselTitle>Na sua Área</CarouselTitle>
              <Carousel { ...settings}>
              {parks.map((park) => (
               <Card 
                key={park.place_id}
                photo={park.photos ? park.photos[0].getUrl() : floresta}
                title={park.name}/>
             ))}
            </Carousel>  
              </>
            ) : (
              <Loader />
            )}
            
        </Search>
        {parks.map((park) => (
          <GreenPlaceCard onClick={() => handleOpenModal(park.place_id)} park={park} />
        ))}  
    </Container>
    <Map query={query} placeId={placeId} />
    <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
        <ModalTitle>{parkSelected?.name}</ModalTitle>
        <ModalContent>{parkSelected?.formatted_photo_number}</ModalContent>
        <ModalContent>{parkSelected?.formatted_address}</ModalContent>
        <ModalContent>{parkSelected?.opening_hours?.open_now ? 'Aberto agora ;)': 'Fechado no momento :('}</ModalContent>
    </Modal>
    </Wrapper>
    );
};

export default Home;