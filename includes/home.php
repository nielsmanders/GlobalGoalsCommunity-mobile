<?php

    $template_vars['bottom_scripts'] = ["home"];

    $featured_creations = $Creation->featured_creations();

    if ($featured_creations) {
        foreach ($featured_creations as $key => $value) {
            $featured_creations[$key]->creator = $User->name($value->user_id);
            $featured_creations[$key]->creator_slug = $User->slug($value->user_id);
            $featured_creations[$key]->sdgs = $Creation->get_sdgs($value->id);
            $featured_creations[$key]->view_count = $Creation->get_views($value->id);
            $featured_creations[$key]->like_count = $Creation->get_likes($value->id);
            $featured_creations[$key]->comment_count = $Creation->get_comment_count($value->id);
        }
    }

    $popular_creations = $Creation->popular_creations();

    if ($popular_creations) {
        foreach ($popular_creations as $key => $value) {
            $popular_creations[$key]->creator = $User->name($value->user_id);
            $popular_creations[$key]->creator_slug = $User->slug($value->user_id);
            $popular_creations[$key]->sdgs = $Creation->get_sdgs($value->id);
            $popular_creations[$key]->view_count = $Creation->get_views($value->id);
            $popular_creations[$key]->like_count = $Creation->get_likes($value->id);
            $popular_creations[$key]->comment_count = $Creation->get_comment_count($value->id);
        }
    }

    $recent_creations = $Creation->recent_creations(6);

    if ($recent_creations) {
        foreach ($recent_creations as $key => $value) {
            $recent_creations[$key]->creator = $User->name($value->user_id);
            $recent_creations[$key]->creator_slug = $User->slug($value->user_id);
            $recent_creations[$key]->sdgs = $Creation->get_sdgs($value->id);
            $recent_creations[$key]->view_count = $Creation->get_views($value->id);
            $recent_creations[$key]->like_count = $Creation->get_likes($value->id);
            $recent_creations[$key]->comment_count = $Creation->get_comment_count($value->id);
        }
    }
    
    $template_vars['featured_creations'] = $featured_creations;
    $template_vars['popular_creations'] = $popular_creations;
    $template_vars['recent_creations'] = $recent_creations;

?>