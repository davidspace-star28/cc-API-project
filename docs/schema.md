# Schema Design

`pk` = Primary Key
`ref: >` = Many to one
`ref: <` = One to many
`ref: -` = One to one

## DisneyMovie Table

```
Table disney_movie {
  id int [pk]
  movie_title(128)[not null, unique]
  release_date(16)[not null]
  hero(64)
  villan(64)
  song(128)
}
```
