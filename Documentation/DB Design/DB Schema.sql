use surveyape;

create table invitees (
	invite_id varchar(255) not null, 
    email varchar(255), 
    survey_token varchar(255), 
    survey_id varchar(255) not null, 
    primary key (invite_id));
    
create table option_ans (option_id varchar(255) not null, 
										option_text longtext, 
                                        option_type varchar(255), 
                                        question_id varchar(255) not null, 
                                        primary key (option_id));
                                        
create table question (question_id varchar(255) not null, is_multiple_choice bit, question_text varchar(255), question_type varchar(255), survey_id varchar(255) not null, primary key (question_id));

create table response_answers (answer_id varchar(255) not null, answer_value varchar(255), question_id varchar(255) not null, response_id varchar(255) not null, primary key (answer_id));

create table survey (survey_id varchar(255) not null, creation_date datetime, is_editable bit, is_published bit, publish_date datetime, survey_end_date datetime, survey_name varchar(255), survey_type varchar(255), update_date datetime, user_id varchar(255) not null, primary key (survey_id));

create table survey_response (response_id varchar(255) not null, email varchar(255), is_submitted bit, survey_id varchar(255) not null, user_id varchar(255), primary key (response_id));

create table user (user_id varchar(255) not null, email varchar(255) not null, firstname varchar(255), lastname varchar(255), password varchar(255), verificationcode integer, verified bit, primary key (user_id));


