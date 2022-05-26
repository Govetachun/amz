import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import React from 'react';
import NextLink from 'next/link';
import Rating from '@material-ui/lab/Rating';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <Card>
      <NextLink href={`/product/${product.slug}`} passHref>
        <CardActionArea style={{ maxHeight: '400px', minHeight: '400px' }}>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
          ></CardMedia>
          <CardContent>
            <h3>{product.name}</h3>
            <Rating value={product.rating} readOnly></Rating>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions
        style={{ marginLeft: '10px', justifyContent: 'space-evenly' }}
      >
        <h3 style={{ textDecoration: 'line-through' }}>
          {' '}
          {product.price * 1.3}.000Đ
        </h3>
        <h3 style={{ color: 'red' }}>{product.price}.000Đ</h3>
      </CardActions>
      <CardActions style={{ marginLeft: '45px' }}>
        <Button
          style={{ background: '#f0c14b' }}
          size="small"
          onClick={() => addToCartHandler(product)}
        >
          Thêm vào giỏ
        </Button>
      </CardActions>
    </Card>
  );
}
