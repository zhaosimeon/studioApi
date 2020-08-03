var expect = require('chai').expect;
const mongoose = require('mongoose');

const POST = require('../models/Post');

it('Post Model Test', function (done) {
    const postModel = new POST(
        {
            id: "1", author: "joe", title: "war", 
            message: "book war and peace",
            notInSchema: "Yes"
        }
    );
    expect(!!postModel).true;
    expect(postModel._id instanceof mongoose.Types.ObjectId).true;
    expect(postModel.author).to.equal("joe");
    expect(postModel.notInSchema).undefined;
    done();
});