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

	async removePoll(id) {
		if (!id) throw 'You must provide an id to search for';

		const pollCollection = await polls();
        const objId = ObjectId.createFromHexString(id);
		const deletionInfo = await pollCollection.deleteOne({ _id: id });

		if (deletionInfo.deletedCount === 0) {
			throw `Could not delete poll with id of ${id}`;
		}
		return { deleted: true };
	},
    
	async updateBand(pollId, pollQuestions, pollAnswers) {
		if(!pollId) throw 'You must provide a poll id to search for';
        if(!pollQuestions || !Array.isArray(pollQuestions)) throw 'You must provide an array of poll questions';
        if(!pollQuestions.length <= 0) throw 'You must provide at least one poll question';
        if(!pollAnswers || !Array.isArray(pollAnswers)) throw 'You must provide an array of poll objects';
        if(!pollAnswers.length <= 0) throw 'You must provide at least one poll answer object';
        
		const pollCollection = await polls();
        
		const updatedPoll = {
            pollQuestions: pollQuestions,
            pollAnswers: pollAnswers
		};

        const objId = ObjectId.createFromHexString(pollId);
		const updatedInfo = await pollCollection.updateOne({ _id: objId }, { $set: updatedPoll });
		if (updatedInfo.modifiedCount === 0) {
			throw 'could not update poll successfully';
		}

		return await this.getPoll(pollId);
	}
};