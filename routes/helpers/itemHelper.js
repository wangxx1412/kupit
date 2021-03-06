const getItemWithId = function(db, id) {
  return db
    .query(
      `
  SELECT * FROM items
  WHERE is_viewable = true
  AND id = $1

  `,
      [id]
    )
    .then(res => {
      const item = res.rows;
      if (item) {
        return Promise.resolve(item);
      } else {
        return Promise.resolve(null);
      }
    });
};

const getItemsWithUserId = function(db, userId) {
  return db
    .query(
      `
SELECT * FROM items
WHERE is_viewable = true
AND user_id = $1
`,
      [userId]
    )
    .then(res => {
      const items = res.rows;
      if (items) {
        return Promise.resolve(items);
      } else {
        return Promise.resolve(null);
      }
    });
};

const getFeaturedItems = function(db) {
  return db
    .query(
      `
  SELECT * FROM items
  WHERE is_viewable = true
  AND is_featured = true
  `
    )
    .then(res => {
      const item = res.rows;
      if (item) {
        return Promise.resolve(item);
      } else {
        return Promise.resolve(null);
      }
    });
};

const addItem = function(db, item) {
  return db
    .query(
      `
INSERT INTO items(user_id,price,description,title,stock,city,image_url)
VALUES($1,$2,$3,$4,$5,$6,$7)
RETURNING *;
`,
      [
        item.user_id,
        item.price,
        item.description,
        item.title,
        item.stock,
        item.city,
        item.image_url
      ]
    )
    .then(res => {
      const item = res.rows;
      if (item) {
        return Promise.resolve(item[0]);
      } else {
        return Promise.resolve(null);
      }
    });
};
const markSold = function(db, itemId) {
  return db
    .query(`UPDATE items SET is_sold = TRUE WHERE id= $1 RETURNING *;`, [
      itemId
    ])
    .then(res => {
      const item = res.rows;
      if (item) {
        return Promise.resolve(item[0]);
      } else {
        return Promise.resolve(null);
      }
    });
};
const removeItem = function(db, itemId) {
  return db
    .query(`UPDATE items SET is_viewable = FALSE WHERE id= $1 RETURNING *;`, [
      itemId
    ])
    .then(res => {
      const item = res.rows;
      if (item) {
        return Promise.resolve(item[0]);
      } else {
        return Promise.resolve(null);
      }
    });
};

module.exports = {
  getItemWithId,
  getItemsWithUserId,
  addItem,
  markSold,
  removeItem,
  getFeaturedItems
};
