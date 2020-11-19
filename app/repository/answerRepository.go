package repository

import (
	"encoding/json"
	"github.com/tidwall/buntdb"
	"log"
	"marcel.works/annaquiz/app/model"
)

type answerRepository struct {
	database *buntdb.DB
}

type AnswerRepository interface {
	Put(key string, answer model.Answer) error
	Get(key string) (model.Answer, error)
	GetByQuizUuid(quizUuid string) ([]model.Answer, error)
}

func NewAnswerRepository() AnswerRepository {
	db, _ := buntdb.Open(":memory:")
	return &answerRepository{database: db}
}

func (r *answerRepository) Put(key string, answer model.Answer) error {
	payload, err := json.Marshal(answer)
	if err != nil {
		return err
	}
	err = r.database.Update(func(tx *buntdb.Tx) error {
		_, _, err := tx.Set(key, string(payload), nil)
		return err
	})
	return err
}

func (r *answerRepository) Get(key string) (model.Answer, error) {
	var result model.Answer
	err := r.database.View(func(tx *buntdb.Tx) error {
		val, err := tx.Get(key)
		if err != nil {
			return err
		}
		err = json.Unmarshal([]byte(val), &result)
		log.Println("found", result)
		return nil
	})
	return result, err
}

func (r *answerRepository) GetByQuizUuid(quizUuid string) ([]model.Answer, error) {
	var result []model.Answer
	err := r.database.View(func(tx *buntdb.Tx) error {
		err := tx.Ascend("", func(key, value string) bool {
			var current model.Answer
			err := json.Unmarshal([]byte(value), &current)
			if err == nil && current.QuizUuid == quizUuid {
				result = append(result, current)
			}
			return true
		})
		return err
	})
	return result, err
}
