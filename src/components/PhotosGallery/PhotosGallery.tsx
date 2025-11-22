import Grid from '../Grid/Grid';
import type { Photo } from '../../types/photo';
import GridItem from '../GridItem/GridItem';
import PhotosGalleryItem from '../PhotosGalleryItem/PhotosGalleryItem';

interface PhotosGalleryProps {
  data: Photo[];
  OpenModal: (photo: Photo) => void;
}

export default function PhotosGallery({ data, OpenModal }: PhotosGalleryProps) {
  return (
    <Grid>
      {data.map(photo => (
        <GridItem
          onClick={() => OpenModal(photo)}
          key={photo.id}
        >
          <PhotosGalleryItem photo={photo} />
        </GridItem>
      ))}
    </Grid>
  );
}
