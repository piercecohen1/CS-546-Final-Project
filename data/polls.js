const mongoCollections = require('../config/mongoCollections');
const polls = mongoCollections.polls;
const { ObjectId } = require('mongodb');

module.exports = {
    
    /* When given an id, this function will return a poll object from the database */
	async getPoll(id) {
		if (!id) throw 'You must provide a poll id to search for';

		const pollCollection = await polls();
        const objId = ObjectId.createFromHexString(id);
        const poll = await pollCollection.findOne({_id: objId});
		if (poll === null) throw 'No poll with that id';

		return poll;
	},

    /* This function will return an array of all polls in the database */
	async getAllPolls() {
		const pollCollection = await polls();
        
		const pollList = await pollCollection.find({}).toArray();

		return pollList;
	},
    
    /* 
    This async function will return a newly created poll object 
    pollQuestion - An Array of strings that represents the questions being asked in by the poll
    pollAnswers - A dict where the keys are the options for poll answers, and each value is the number of votes for that poll answer
    
    Example:
    pollQuestions = ["What is the best city to visit?"]
    pollAnswers = An Array of poll objects
    Example of a poll object: {"NYC": 5, "Los Angeles": 4, "Chicago": 2}
    */
    async addPoll(pollQuestions, pollAnswers){
        if(!pollQuestions || !Array.isArray(pollQuestions)) throw 'You must provide an array of poll questions';
        if(!pollQuestions.length <= 0) throw 'You must provide at least one poll question';
        if(!pollAnswers || !Array.isArray(pollAnswers)) throw 'You must provide an array of poll objects';
        if(!pollAnswers.length <= 0) throw 'You must provide at least one poll answer object';
        
        const pollCollection = await polls();
        
        let newPoll = {
            pollQuestions: pollQuestions,
            pollAnswers: pollAnswers
        };
        
        const insertInfo = await pollCollection.insertOne(newPoll);
        if(insertInfo.insertedCount == 0) throw 'Insert Failed: Could not add band';
        
        const newId = insertInfo.insertedId;
        
        const poll = await this.getPoll(newId);
        return poll;
    },

	async removeBand(id) {
		if (!id) throw 'You must provide an id to search for';

		const bandCollection = await bands();
        const objId = ObjectId.createFromHexString(id);
		const deletionInfo = await bandCollection.deleteOne({ _id: id });

		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete band with id of ${id}`;
		}
		return { deleted: true };
	},
    
	async updateBand(bandId, bandName, bandMembers, yearFormed, genres, recordLabel, albums) {
		if(!bandId) throw 'You must provide a band id to search for';
        if(!bandName) throw 'You must provide a band name';
        if(!bandMembers || !Array.isArray(bandMembers)) throw 'You must provide an array of band members';
        if(bandMembers.length <= 0) throw 'You must provide at least one band member';
        if(!yearFormed) throw 'You must provide a year formed';
        if(!genres || !Array.isArray(genres)) throw 'You must provide an array of genres';
        if(genres.length <= 0) throw 'You must provide at least one genre';
        if(!recordLabel) throw 'You must provide a record label';
        if(!albums || !Arrray.isArray(albums)) throw 'You must provide an array of albums';
        if(albums.length <= 0) throw 'You must provide at least one album';

		const bandCollection = await bands();
        
		const updatedBand = {
            bandName: bandName,
            bandMembers: bandMembers,
            yearFormed: yearFormed,
            genres: genres,
            recordLabel: recordLabel,
            albums: albums
		};

        const objId = ObjectId.createFromHexString(bandId);
		const updatedInfo = await bandCollection.updateOne({ _id: objId }, { $set: updatedBand });
		if (updatedInfo.modifiedCount === 0) {
			throw 'could not update band successfully';
		}

		return await this.getBand(bandId);
	}
};