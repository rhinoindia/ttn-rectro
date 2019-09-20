/* eslint-disable no-console */
import { findByName } from './ProjectService';
import Boards from '../models/Boards.model';
import * as respond from '../../utililies/respond';

const columnsData = [
  { name: 'what went good' },
  { name: 'what went wrong' },
  { name: 'actions' },
];

export function findById(id) {
  return Boards.findById(id)
    .catch((err) => { throw new respond.BadRequestError(err); });
}

export function getByName(name) {
  return Boards.findOne({ name })
    .catch((err) => { throw new respond.BadRequestError(err); });
}

export function add(req) {
  const { projectName } = req.body;
  const name = `${projectName}_${req.body.name}`;
  const Project = findByName(projectName);
  const columns = req.body.columns || columnsData;
  const data = { name, columns };
  const Board = new Boards(data);
  return Board.save()
    .then((board) => {
      console.log(board.toJSON, 'Boarddddssssssssssssss');
      Project.then((project) => {
        if (project) {
          project.boards.push(Board.id);
          project.save();
        }
      });
      return board;
    })
    .catch((err) => {
      throw new respond.HandleMongoError(err);
    });
}

export async function addComments(req) {
  const { columnId, message, boardId } = req.body;
  const Board = await findById(boardId);
  if (Board) {
    const reqData = { columnId, message };
    Board.comments.push(reqData);
    Board.save();
  }
  return Board;
}

export async function updateComments(req) {
  const { message, boardId, commentId } = req.body;
  return Boards.updateOne({ _id: boardId, 'comments._id': commentId }, { $set: { 'comments.$.message': message } })
    .then(() => boardId)
    .catch((error) => { throw new Error(error); });
}

export async function get(name) {
  const Board = await getByName(name);
  return Board;
}
