'use strict';

import { expect } from 'chai';
import Db from './db';
import Model from './model';

describe('Model', function() {

  const db = new Db();
  let documents;

  const modelDocuments = [
    { name: 'model0', color: 'color0', owner: 'ownerA' },
    { name: 'model1', color: 'color1', owner: 'ownerB' },
    { name: 'model2', color: 'color2', owner: 'ownerA' }
  ];

  before(function() {
    return db.connect()
      .then(function(dbo) {
        documents = new Model('documents');
        return documents.collection.remove();
      });
  });

  it('initially has no documents', function() {
    return documents
      .all()
      .then(function(list) {
        expect(list.length).to.be.equal(0);
      });
  });

  it('creates one new document', function() {
    return documents
      .createOne(modelDocuments[0])
      .then(function() {
        return documents.all();
      })
      .then(function(list) {
        expect(list.length).to.be.equal(1);
      });
  });

  it('creates many new documents', function() {
    return documents
      .createMany(modelDocuments)
      .then(function() {
        return documents.all();
      })
      .then(function(list) {
        expect(list.length).to.be.above(1);
      });
  });

  context('with documents in the database', function() {

    beforeEach(function() {
      return documents.createMany(modelDocuments);
    });

    it('can find all documents', function() {
      return documents
        .all()
        .then(function(list) {
          expect(list.length).to.be.equal(modelDocuments.length);
        });
    });

    it('can find a specific document', function() {
      return documents
        .findOne(modelDocuments[0])
        .then(function(doc) {
          expect(doc.name).to.be.equal('model0');
        });
    });

    it('can find many specific documents', function() {
      return documents
        .findMany({ owner: 'ownerA' })
        .then(function(list) {
          expect(list.length).to.be.equal(2);
        });
    });

    it('can delete a specific document', function() {
      return documents
        .drop(modelDocuments[0])
        .then(function() {
          return documents.findOne(modelDocuments[0]);
        })
        .then(function(doc) {
          expect(doc).to.be.null;
        });
    });

    it('can modify a document', function() {
      return documents
        .update(modelDocuments[0], { color: 'black'})
        .then(function() {
          return documents.findOne({ name: modelDocuments[0].name });
        })
        .then(function(doc) {
          expect(doc.color).to.be.equal('black');
        });
    });

    it('can add a new field to a document', function() {
      return documents
        .update(modelDocuments[0], { size: "Large" })
        .then(function() {
          return documents.findOne({ name: modelDocuments[0].name });
        })
        .then(function(doc) {
          expect(doc.size).to.be.equal('Large');
        });
    });
  });

  // bug in mocha? this block should not run once for every it() block in the preceeding context(), but it does!
  afterEach(function() {
    return documents.collection.remove();
  });

  after(function() {
    return db.close();
  });
});
