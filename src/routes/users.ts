import { Router } from 'express';

import { userDb, characterDb } from '../databases';

import { User } from '../user';
import { Character, ValidateCharacter } from '../character';

const router = Router();

router.get('/', function(req, res)
{
    userDb.find({})
    .then(users =>
        {
            res.status(200).send(users);
        })
    .catch(err =>
        {
            console.error(err);
            res.status(404).send([]);
        });
});

router.post('/', function(req, res)
{
    const newUser = req.body as User;
    userDb.insert(newUser)
    .then(user =>
        {
            res.status(201).send(user);
        })
    .catch(err =>
        {
            console.error(err);
            res.status(400).send();
        });
});

// router.get('/:userId', function(req, res)
// {
//     const userId = req.params.userId;
//     res.status(200).send(req.params.userId);
// });

// router.put('/:userId', function(req, res)
// {
//     res.status(200).send(req.params.userId);
// });

router.delete('/:userId', function(req, res)
{
    const userId = req.params.userId;
    userDb.remove({_id: userId})
    .then(n =>
        {
            res.status(200).send(n);
        })
    .catch(err =>
        {
            console.log(err);
            res.status(400).send(err.message);
        })
});

router.get('/:userId/characters', function(req, res)
{
    characterDb.find({owner: req.params.userId})
    .then(characters =>
        {
            res.status(200).send(characters);
        })
    .catch(err =>
        {
            console.error(err);
            res.status(400).send([]);
        })
});

router.post('/:userId/characters', function(req, res)
{
    const owner = req.params.userId;

    const newCharacter = req.body as Character;
    newCharacter.owner = owner;

    const errors = ValidateCharacter(newCharacter);

    if(errors.length > 0)
    {
        res.status(400).send(errors);
        return;
    }

    //check if user exists
    userDb.findOne({_id: owner})
    .then(user =>
        {
            if(user)
            {
                return characterDb.insert(newCharacter);
            }
            else
            {
                throw new Error(`no user with id ${owner}`);
            }
        })
    .then(character =>
        {
            res.status(201).send(character);
        })
    .catch(err =>
        {
            console.error(err);
            res.status(400).send(err.message);
        })
});

router.put('/:userId/characters/:characterId', function(req, res)
{
    const userId = req.params.userId;
    const characterId = req.params.characterId;

    const newCharacter = req.body as Character;
    newCharacter.owner = userId;

    const errors = ValidateCharacter(newCharacter);

    if(errors.length > 0)
    {
        res.status(400).send(errors);
        return;
    }

    characterDb.update({owner: userId, _id: characterId}, newCharacter)
    .then(numberReplaced =>
        {
            res.status(200).send();
        })
    .catch(err =>
        {
            console.error(err);
            res.status(400).send(err.message);
        })
});

router.delete('/:userId/characters/:characterId', function(req, res)
{
    const userId = req.params.userId;
    const characterId = req.params.characterId;
    characterDb.remove({owner: userId, _id: characterId})
    .then(n =>
        {
            res.status(200).send();
        })
    .catch(err =>
        {
            console.log(err);
            res.status(400).send(err.message);
        })
});

export { router as userRouter };