import Section from '../Section/Section';
import Container from '../Container/Container';
import Form from '../Form/Form';
import { getPhotos } from '../../services/photos';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
import { useState } from 'react';
import type { Photo } from '../../types/photo';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import Modal from '../Modal/Modal';
// import GridItem from '../GridItem/GridItem';

export default function App() {
  const [photoData, setPhotoData] = useState<Photo[] | null>(null);
  const [isErrorText, setIsErrorText] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [selectedPhoto, setselectedPhoto] = useState<Photo | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  async function Naidi(userValue: string) {
    try {
      setIsErrorText(false);
      setIsLoader(true);
      const data = await getPhotos(userValue);
      setPhotoData(data);
    } catch {
      setIsLoader(true);
      setIsErrorText(true);
      toast.error('This is an error!');
    } finally {
      setIsLoader(false);
    }
  }
  function selectPhotoModal(photo: Photo) {
    setselectedPhoto(photo);
    setIsOpenModal(true);
  }
  function closeModal() {
    setIsOpenModal(false);
  }
  return (
    <>
      <Section>
        <Container>
          {isOpenModal && (
            <Modal onClose={closeModal}>
              <img
                src={selectedPhoto?.src.large}
                alt={selectedPhoto?.src.large}
              />
            </Modal>
          )}
          <Form onSubmit={Naidi} />
          {isErrorText && (
            <Text>
              {' '}
              <Toaster />
            </Text>
          )}
          {isLoader && <Loader />}
          {photoData && (
            <PhotosGallery
              data={photoData}
              OpenModal={selectPhotoModal}
            />
          )}
        </Container>
      </Section>
    </>
  );
}
