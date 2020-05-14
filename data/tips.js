const mongoCollections = require('../config/mongoCollections');
const tips = mongoCollections.tips;
const users = require('./users');
const uuid = require('uuid');
const { ObjectId } = require('mongodb');

const exportedMethods = {
  async getAllTips() {
    const tipCollection = await tips();
    return await tipCollection.find({}).toArray();
  },
  async getTipsByTag(tag) {
    if (!tag) throw 'No tag provided';

    const tipCollection = await tips();
    return await tipCollection.find({tags: tag}).toArray();
  },
    
  async getTipById(id) {
    const tipCollection = await tips();
    //const objId = ObjectId.createFromHexString(id);
    const tip = await tipCollection.findOne({_id: id});

    if (!tip) throw 'Tip not found';
    return tip;
  },
  async addTip(title, body, tags, posterId) {
    if (typeof title !== 'string') throw 'No title provided';
    if (typeof body !== 'string') throw 'I aint got nobody!';

    if (!Array.isArray(tags)) {
      tags = [];
    }

    const tipCollection = await tips();

    const userThatPosted = await users.getUserById(posterId);

    const newTip = {
      title: title,
      body: body,
      poster: {
        id: posterId,
        name: `${userThatPosted.firstName} ${userThatPosted.lastName}`
      },
      tags: tags,
    };

    const newInsertInformation = await tipCollection.insertOne(newTip);
    const newId = newInsertInformation.insertedId;

    await users.addTipToUser(posterId, newId, title);

    return await this.getTipById(newId);
  },
  async removeTip(id) {
    const tipCollection = await tips();
    let tip = null;
    try {
      tip = await this.getTipById(id);
    } catch (e) {
      console.log(e);
      return;
    }
    //const objId = ObjectId.createFromHexString(id);
    const deletionInfo = await tipCollection.removeOne({_id: id});
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete tip with id of ${id}`;
    }
    await users.removeTipFromUser(tip.poster.id, id);
    return true;
  },
  async updateTip(id, updatedTip) {
    const tipCollection = await tips();

    const updatedTipData = {};

    if (updatedTip.tags) {
      updatedTipData.tags = updatedTip.tags;
    }

    if (updatedTip.title) {
      updatedTipData.title = updatedTip.title;
    }

    if (updatedTip.body) {
      updatedTipData.body = updatedTip.body;
    }

    //const objId = ObjectId.createFromHexString(id);
    await tipCollection.updateOne({_id: id}, {$set: updatedTipData});

    return await this.getTipById(id);
  },
    
  async renameTag(oldTag, newTag) {
    if (oldTag === newTag) throw 'tags are the same';
    let findDocuments = {
      tags: oldTag
    };

    let firstUpdate = {
      $addToSet: {tags: newTag}
    };

    let secondUpdate = {
      $pull: {tags: oldTag}
    };

    const tipCollection = await tips();
    await tipCollection.updateMany(findDocuments, firstUpdate);
    await tipCollection.updateMany(findDocuments, secondUpdate);

    return await this.getTipsByTag(newTag);
  }
};

module.exports = exportedMethods;
