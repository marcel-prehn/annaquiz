package service

import (
	"github.com/google/uuid"
	"marcel.works/annaquiz/app/model"
	"marcel.works/annaquiz/app/repository"
	"math/rand"
	"time"
)

type service struct {
	quizRepository   repository.QuizRepository
	answerRepository repository.AnswerRepository
}

type Service interface {
	SaveQuiz(quiz model.Quiz) (string, error)
	SaveAnswers(quizUuid string, answers []model.Answer) error
	GetQuiz(quizUuid string) (model.Quiz, error)
	GetAllQuizzes() ([]model.Quiz, error)
	GetAnswer(answerUuid string) (model.Answer, error)
	GetAnswersByQuiz(quizUuid string) ([]model.Answer, error)
	GetRandomAnswersByQuiz(quizUuid string) ([]model.Answer, error)
}

func NewService() Service {
	quizRepo := repository.NewQuizRepository()
	answerRepo := repository.NewAnswerRepository()
	return &service{quizRepository: quizRepo, answerRepository: answerRepo}
}

func (s *service) SaveQuiz(quiz model.Quiz) (string, error) {
	quiz.Uuid = uuid.New().String()
	quiz.Timestamp = time.Now()
	var questions []model.Question
	for _, question := range quiz.Questions {
		question.Uuid = uuid.New().String()
		questions = append(questions, question)
	}
	quiz.Questions = questions
	return quiz.Uuid, s.quizRepository.Put(quiz.Uuid, quiz)
}

func (s *service) SaveAnswers(quizUuid string, answers []model.Answer) error {
	var err error
	for _, answer := range answers {
		answer.Uuid = uuid.New().String()
		answer.QuizUuid = quizUuid
		err = s.answerRepository.Put(answer.Uuid, answer)
	}
	return err
}

func (s *service) GetQuiz(quizUuid string) (model.Quiz, error) {
	return s.quizRepository.Get(quizUuid)
}

func (s *service) GetAllQuizzes() ([]model.Quiz, error) {
	return s.quizRepository.GetAll()
}

func (s *service) GetAnswer(answerUuid string) (model.Answer, error) {
	return model.Answer{}, nil
}

func (s *service) GetAnswersByQuiz(quizUuid string) ([]model.Answer, error) {
	return s.answerRepository.GetByQuizUuid(quizUuid)
}

func (s *service) GetRandomAnswersByQuiz(quizUuid string) ([]model.Answer, error) {
	answers, err := s.answerRepository.GetByQuizUuid(quizUuid)
	var result []model.Answer
	if err != nil {
		return nil, err
	}

	counter := 0
	for counter < 3 {
		answer := answers[rand.Intn(len(answers)-1)]
		if !s.contains(&result, answer.QuestionUuid) {
			result = append(result, answer)
			counter = counter + 1
		}
	}
	return result, nil
}

func (s *service) contains(list *[]model.Answer, uuid string) bool {
	for _, answer := range *list {
		if answer.QuestionUuid == uuid {
			return true
		}
	}
	return false
}
