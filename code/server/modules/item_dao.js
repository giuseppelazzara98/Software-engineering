'use strict';
//Data Access Object
const sqlite = require('sqlite3');
const dayjs = require('dayjs');

function item_dao(){
    const itemDB = new sqlite.Database("./modules/database/ezwh.sqlite", (err) => {
        if (err) {
            console.log("Error connecting to DB");
            throw err;
        }
        console.log("Connected to DB");

    });

    this.getItems=()=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM items';
            itemDB.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const items = rows.map((r) => (
                    {  
                       id:r.id,
                       description:r.description,
                       price:r.price,
                       SKUId:r.SKUId,
                       supplierId:r.supplierId
                    }
                ));
                resolve(items);
            });
        });
      }
    
      this.getItemsById=(id)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM items WHERE ID=?';//WRITE SQL COMMAND
            itemDB.all(sql, [id], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const items = rows.map((r) => (
                    {  
                        id:r.id,
                        description:r.description,
                        price:r.price,
                        SKUId:r.SKUId,
                        supplierId:r.supplierId
                    }
                ));
                resolve(items);
            });
        });
      }
    
      this.postItem=(data)=>{
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO items(id,description,price,SKUId,supplierId) VALUES(?, ?, ?, ?, ?)';//WRITE SQL COMMAND
            itemDB.run(sql, [data.id, data.description, data.price,data.SKUId, data.supplierId], (err) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(this.lastID);
            });
        });
    }

    this.checkSKUId=(supplierId,SKUId)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM items WHERE supplierId=? AND SKUId=?';
            itemDB.all(sql, [supplierId,SKUId], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const items = rows.map((r) => (
                    {  
                        id:r.id,
                        description:r.description,
                        price:r.price,
                        SKUId:r.SKUId,
                        supplierId:r.supplierId
                    }
                ));
                resolve(items);
            });
        });
      }
      this.checkId=(supplierId,id)=>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM items WHERE supplierId=? AND id=?';
            itemDB.all(sql, [supplierId,id], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                const items = rows.map((r) => (
                    {  
                        id:r.id,
                        description:r.description,
                        price:r.price,
                        SKUId:r.SKUId,
                        supplierId:r.supplierId
                    }
                ));
                resolve(items);
            });
        });
      }

    
    
    
    this.putItem=(data,id)=>{
        return new Promise((resolve, reject) => {
        const sql = 'UPDATE items SET ,description=?,price=? WHERE id=?';
        itemDB.run(sql, [ data.newDescription,data.newPrice, id], (err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(this.lastID);
        });
    });
    }
    
    this.deleteItem=(id)=>{
        return new Promise((resolve, reject)  => {
            const sql = 'DELETE FROM items WHERE id=?';
            itemDB.run(sql,[id], (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(this.lastID);
            });
        });
    }

}

module.exports= item_dao;