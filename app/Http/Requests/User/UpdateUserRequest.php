<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255|min:10',
            'email' => 'required|string|email|max:255|unique:users,email,' . $this->user->id,
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'name.required' => 'The name is required',
            'name.min' => 'The name is required :min characters',
            'name.string' => 'The name must be a string',
            'name.max' => 'The name must be less than 255 characters',
            'email.required' => 'The email is required',
            'email.string' => 'The email must be a string',
            'email.email' => 'The email must be a valid email',
            'email.max' => 'The email must be less than 255 characters',
            'email.unique' => 'The email must be unique',
        ];
    }
}
