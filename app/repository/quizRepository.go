package repository

import (
	"encoding/json"
	"github.com/tidwall/buntdb"
	"marcel.works/annaquiz/app/model"
)

type quizRepository struct {
	database *buntdb.DB
}

type QuizRepository interface {
	Put(key string, quiz model.Quiz) error
	Get(key string) (model.Quiz, error)
	GetAll() ([]model.Quiz, error)
}

func NewQuizRepository() QuizRepository {
	db, _ := buntdb.Open(":memory:")
	return &quizRepository{database: db}
}

func (r *quizRepository) Put(key string, quiz model.Quiz) error {
	payload, err := json.Marshal(quiz)
	if err != nil {
		return err
	}
	err = r.database.Update(func(tx *buntdb.Tx) error {
		_, _, err := tx.Set(key, string(payload), nil)
		return err
	})
	return err
}

func (r *quizRepository) Get(key string) (model.Quiz, error) {
	var result model.Quiz
	err := r.database.View(func(tx *buntdb.Tx) error {
		val, err := tx.Get(key)
		if err != nil {
			return err
		}
		err = json.Unmarshal([]byte(val), &result)
		return err
	})
	return result, err
}

func (r *quizRepository) GetAll() ([]model.Quiz, error) {
	var result []model.Quiz
	err := r.database.View(func(tx *buntdb.Tx) error {
		err := tx.Ascend("", func(key, value string) bool {
			var current model.Quiz
			_ = json.Unmarshal([]byte(value), &current)
			result = append(result, current)
			return true
		})
		return err
	})
	return result, err
}
