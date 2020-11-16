package model

import "time"

type Quiz struct {
	Uuid      string     `json:"uuid"`
	Creator   string     `json:"creator"`
	Questions []Question `json:"questions"`
	Timestamp time.Time  `json:"timestamp"`
}

type Question struct {
	Uuid string `json:"uuid"`
	Text string `json:"text"`
}

type Answer struct {
	Uuid         string `json:"uuid"`
	QuizUuid     string `json:"quizUuid"`
	QuestionUuid string `json:"questionUuid"`
	Username     string `json:"username"`
	Text         string `json:"text"`
}
