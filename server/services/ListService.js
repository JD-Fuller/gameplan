import mongoose from 'mongoose'
import List from "../models/List"

const _repository = mongoose.model('List', List)

class ListService {

}


const _listService = new ListService()
export default _listService