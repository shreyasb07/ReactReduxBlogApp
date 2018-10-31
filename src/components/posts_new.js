import _ from 'lodash'; 
import React, {Component} from 'react';
import {connect} from 'react-redux';
import{Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {createPosts} from '../actions';

class PostsNew extends Component{

    renderField(field){
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}`;

        return(
            <div className = {className}>
                <label>{field.label}</label>
                <input 
                className= "form-control"
                //object that contains event handlers/props
                    {...field.input}
                />
                {/* terneary expression */}
                {/* it means that anything before the ? is evaluated. if returns true, then the entire expression resolves with anything between the ? and the  colon : 

if the expression returs a false value, then the entire expression resolves with the content after the colon : */}
                <div className = "text-help">
                {field.meta.touched ?  field.meta.error: ''}
                </div>
                
            </div>
        );
    }

    onSubmit(values){
        //console.log(values);
        //go back to the root route on submit
        //this.props.history.push('/')
        this.props.createPosts(values, ()=>{
        //   go back to root route ONLY AFTER post is created and submitted
            this.props.history.push('/');
        })
    }


    render(){
        const {handleSubmit} = this.props;


        return(
            <div>
                <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
                {/* used to represent a distinct input visible to the user  */}
                    <Field 
                    label = "Title"
                    name = "title"
                    //function that returns some amount of JSX, interacts with the user
                    component = {this.renderField}
                    />
                    <Field 
                    label= "Categories"
                    name = "categories"
                    //function that returns some amount of JSX, interacts with the user
                    component = {this.renderField}
                    />
                    <Field 
                    label =  "Post Content"
                    name = "content"
                    //function that returns some amount of JSX, interacts with the user
                    component = {this.renderField}
                    />
                    <button type="submit" className= "btn btn-primary">Submit</button> 
                    <Link to= "/" className = "btn btn-danger">Cancel</Link>
                </form>
            </div>
        );
    }
}


function validate(values){
    //initialize empty errors object
    const errors = {};

    //Validate inputes from the values object
    if(!values.title || values.title.length < 3){
        errors.title = "Enter a Title that has atleast 3 characters!";
    }

    if(!values.categories){
        errors.categories = "Enter some Categories";
    }
    if(!values.content){
        errors.content = "Enter some content!";
    }


    //if errors object is empty, there are no errors, the form is fine to submit.

    //if errors object has any properties, redux-form assumes, form is invalid
    return errors;
}

export default reduxForm({
    //string needs to be unique
    validate,
    form: 'PostsNewForm'
    
})(
    connect(null, { createPosts })(PostsNew)    
);