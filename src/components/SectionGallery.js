import React from 'react';
import {graphql, useStaticQuery} from 'gatsby'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useMediaQuery} from '@material-ui/core';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function SectionGallery() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const data = useStaticQuery(graphql`
  query GalleryComponentQuery {
    allCloudinaryMedia(filter: {secure_url: {regex: "/clients/"}}, sort: {order: ASC, fields: created_at}) {
      edges {
        node {
          id
          secure_url
          internal {
            description
          }
        }
      }
    }
  }
  `)

  return (
    <div className={classes.root}>
      <ImageList gap={8} rowHeight={matchesSm ? 160 : 520} className={classes.imageList} cols={matchesSm ? 1.5 : 2.5}>
        {data.allCloudinaryMedia.edges.map((item) => (
          <ImageListItem key={item.node.img}>
            <img src={item.node.secure_url} alt={item.node.internal.description} />
            <ImageListItemBar
              title={item.node.description}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${item.node.description}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
